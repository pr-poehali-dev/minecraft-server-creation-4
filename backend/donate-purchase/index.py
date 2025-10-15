import json
import os
from typing import Dict, Any
from pydantic import BaseModel, Field

class PurchaseRequest(BaseModel):
    nickname: str = Field(..., min_length=1)
    items: list = Field(..., min_items=1)
    total_price: int = Field(..., gt=0)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle donation purchases and send notifications
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        purchase = PurchaseRequest(**body_data)
        
        items_list = '\n'.join([f"- {item['name']} ({item['price']}₽)" for item in purchase.items])
        
        telegram_message = f"""🛒 НОВАЯ ПОКУПКА!

Никнейм: {purchase.nickname}
Товары:
{items_list}

Итого: {purchase.total_price}₽

⚠️ Выдайте товары на сервере RoomTimeServ.mc-join.me"""
        
        result = {
            'success': True,
            'message': 'Заказ принят! Свяжитесь с @KarpovST1M в Telegram',
            'telegram_message': telegram_message,
            'server_ip': 'RoomTimeServ.mc-join.me',
            'nickname': purchase.nickname,
            'items': purchase.items,
            'total': purchase.total_price
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result, ensure_ascii=False)
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }

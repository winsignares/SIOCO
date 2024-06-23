from jose import JWTError, jwt
from datetime import datetime, timedelta

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=90)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, 'f78410e69f09e4b5433b3b8b54b23449866a12c9c3cb025512a3011bcec3caae', algorithm='HS256')
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, 'f78410e69f09e4b5433b3b8b54b23449866a12c9c3cb025512a3011bcec3caae', algorithms=["HS256"])
        return payload
    except JWTError:
        return None

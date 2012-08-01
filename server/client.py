import socket
import zlib
import json

UDP_IP = '127.0.0.1'
UDP_PORT = 8080

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

sock.bind((UDP_IP, 8001))

message = zlib.compress('{"api":"login","username":"agilbert","password":"12345"}')
sock.sendto(message, (UDP_IP, UDP_PORT))

while True:
  data, addr = sock.recvfrom(1024)
  msg = zlib.decompress(data)
  obj = json.loads(msg)
  print 'Received message:', obj

import os
from flask import Flask
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__) # Instanciando una clase de tipo Flask

# Prueba
@app.route('/')
def inicio():
    test = os.getenv("TEST")
    return test

# Envío de correos
@app.route('/envio-correo')
def email():

    destino = request.args.get('correo_destino')
    asunto = request.args.get('asunto')
    mensaje = request.args.get('contenido')

    message = Mail(
    from_email='ferneyvanegas@hotmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return 'Correo electrónico enviado :)'
    except Exception as e:
        print(e)
        return 'Correo electrónico no enviado :('

if __name__ == '__main__':
    app.run()
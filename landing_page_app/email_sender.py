import smtplib
from email.mime.text import MIMEText
from django.contrib.auth.models import User
from .functions import format_IT_date


def admin_mail(request_data: dict):
    return f"""
        <h1>Noleggio {request_data["car"]}</h1>
        <img scr="{request_data["img"]} alt="{request_data["car"]}"/>
        <p>Nome utente: {request_data["username"]}</p>
        <p>Email: {request_data["email"]}</p>
        <p>Data acquisizione: {format_IT_date(request_data["start"])}</p>
        <p>Data restituzione: {format_IT_date(request_data["stop"])}</p>
        <p>Note: {request_data["notes"]}</p>
    """


def admin_users():
    return list(map(lambda u: u.email, User.objects.all()))


def send_email(*,
               subject: str,
               html: str,
               recipients: list[str],
               host: str,
               port: int,
               sender: str,
               password: str):
    joined_recipients = ', '.join(recipients)
    msg = MIMEText(html, 'html')
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = joined_recipients
    smtp_server = smtplib.SMTP_SSL(host, port)
    smtp_server.login(sender, password)
    smtp_server.sendmail(sender, recipients, msg.as_string())
    print(f"Email {subject} sent to {joined_recipients}")


def send_admin_email(request_data: dict):
    send_email(
        subject="Nuova prenotazione",
        html=admin_mail(request_data),
        recipients=admin_users(),
        host="smtp.gmail.com",
        port=465,
        sender="testemailsender76@gmail.com",
        password="lfcmflxydfgpvnjk"
    )

# if __name__ == '__main__':
#     host = "smtp.gmail.com"
#     port = 465
#     subject = 'Test Email'
#     msg = "EMAIL SENT FROM EMAIL_SENDER.PY"
#     sender = "testemailsender76@gmail.com"
#     recipients = ["valerioxz@gmail.com","valeriomolinariprogrammazione@gmail.com"]
#     password = "lfcmflxydfgpvnjk"
#
#     send_email(host, port, subject, msg, sender, recipients, password)

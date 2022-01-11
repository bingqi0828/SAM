from django.db import models
from datetime import datetime
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    nick_name=models.CharField('Nick name', max_length=50)
    birthday=models.DateField('Birthday', null=True, blank=True)
    address=models.CharField('Address', max_length=100)
    mobile=models.CharField('Telephone', max_length=11, null=True, blank=True)
    image=models.ImageField(upload_to='image/%Y%m',max_length=100)

    def __str__(self):
        return self.nick_name
    class Meta:
        verbose_name='User information'
        verbose_name_plural=verbose_name


class EmailVerifyRecord(models.Model):
    send_choices = (
        ('register','注册'),
        ('forget','找回密码')
    )

    code=models.CharField('code', max_length=50)
    email=models.EmailField('Email', max_length=50)
    send_type=models.CharField('Send Type',choices=send_choices, max_length=20)
    send_time=models.DateTimeField(default=datetime.now)

    class Meta:
        verbose_name='Email verifying code'
        verbose_name_plural=verbose_name
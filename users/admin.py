from django.contrib import admin
from .models import EmailVerifyRecord
# Register your models here.
from .models import User

class userinfo(admin.ModelAdmin):
    list_display = ['username', 'password', 'is_superuser', 'email', 'is_active']
    search_fields = ['username', 'password', 'is_superuser', 'email']
    list_filter = ['username', 'password', 'is_superuser', 'email']

admin.site.register( User, userinfo)

class EmailVerifyRecordAdmin(admin.ModelAdmin):
    # 显示的列
    list_display = ['code', 'email', 'send_type', 'send_time']
    # 搜索的字段，不要添加时间搜索
    search_fields = ['code', 'email', 'send_type']
    # 过滤
    list_filter = ['code', 'email', 'send_type', 'send_time']


admin.site.register(EmailVerifyRecord,EmailVerifyRecordAdmin)
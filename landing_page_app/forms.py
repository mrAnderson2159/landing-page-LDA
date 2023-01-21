from django import forms
from django.contrib.auth.models import User

# Create your forms here
class LoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = "username", "password"
        widgets = {
            "username": forms.TextInput(attrs={'class': 'form-control'}),
            "password": forms.PasswordInput(attrs={'class': 'form-control'}),
        }
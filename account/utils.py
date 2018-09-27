from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth.views import logout as django_logout

def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password') if request.POST.get('password', None) else request.POST.get('password1')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_active:
        django_login(request, user)
        return {
            'username': user.username,
            'id': user.id
        }
    return None

def logout(request):
    django_logout(request)
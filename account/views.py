from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def create(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)

            user_json = {
                'id': user.id,
                'username': user.username
            }

            return JsonResponse({ 'user': user_json })
        return JsonResponse({ 'error': form.errors })
    return JsonResponse({ 'error': 'Expecting POST request' })

def sign_out(request):
    logout(request)
    return JsonResponse({ 'user': None})

def sign_in(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(username=username, password=password)

    if user is not None and user.is_active:
        login(request, user)
        user_json = {
            'username': user.username,
            'id': user.id
        }
        return JsonResponse({ 'user': user_json })
    else:
        return JsonResponse(
            {'login': 'Invalid email/password combination'},
            status=400)



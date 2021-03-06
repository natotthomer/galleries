from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm

from account.utils import login, logout

def create(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            user = login(request)

            return JsonResponse({ 'user': user })
        errors = []
        for field, error in form.errors.items():
            errors.append(f"{field}: {error.data[0].message}\n")
        return JsonResponse({ 'error': errors }, status=400)
    return JsonResponse({ 'error': 'Expecting POST request' }, status=400)

def sign_out(request):
    logout(request)
    return JsonResponse({ 'user': None })

def sign_in(request):
    user = login(request)
    if user:
        return JsonResponse({ 'user': user })
    return JsonResponse(
        {'error': 'Invalid email/password combination'},
        status=400
    )





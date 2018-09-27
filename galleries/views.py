import json

from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import login



from galleries.models import Gallery, Image
from galleries.forms import ImageForm

def home(request):
    if request.user.is_authenticated:
        user = {'id': request.user.id, 'username': request.user.username }
    else:
        user = None
    return render(request, "base.html", { 'payload': { 'user': json.dumps(user) } })

def read_gallery(request, id):
    gallery = Gallery.objects.get(id=id)

    return JsonResponse({ 'gallery': gallery.to_client() })

def create_gallery(request):
    if request.method == 'POST' and request.FILES:
        fs = FileSystemStorage()
        responseData = []
        gallery = Gallery.objects.create(title=request.POST.get('title'))
        
        for i in range(len(request.FILES)):
            if i < 5:
                file = request.FILES.get(str(i))
                form = ImageForm(request.POST, { 'file': file })
                if form.is_valid():
                    image = form.save()
                    image.gallery = gallery
                    image.save()
                    responseData.append(image.file.url)
                else:
                    JsonResponse({ error: form.errors })
            else:
                return JsonResponse({ 'error': 'Galleries may not have more than 5 associated images. Please try again.'})
        return JsonResponse({ 'gallery': gallery.to_client() })
    return JsonResponse({ 'error': 'Server expects a POST request.'}, status=400)
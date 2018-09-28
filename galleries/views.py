import json

from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import ensure_csrf_cookie

from galleries.models import Gallery, Image, Vote
from galleries.forms import ImageForm

@ensure_csrf_cookie
def home(request):
    if request.user.is_authenticated:
        user = {'id': request.user.id, 'username': request.user.username }
    else:
        user = json.dumps(None)
    return render(request, "base.html", { 'payload': { 'user': user } })

def read_gallery(request, id):
    gallery = Gallery.objects.prefetch_related('vote_set').get(id=id)
    try:
        user_vote = gallery.vote_set.get(user=request.user).image.id
    except Vote.DoesNotExist:
        user_vote = None

    return JsonResponse({ 'gallery': gallery.to_client(), 'user_vote': user_vote })

def create_gallery(request):
    if not request.user or not request.user.is_authenticated:
        return JsonResponse({ 'error': 'You cannot make a new gallery without logging in first!'}, status=400)

    if request.method == 'POST' and request.FILES:
        fs = FileSystemStorage()
        responseData = []
        gallery = Gallery.objects.create()
        
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
                return JsonResponse({ 'error': 'Galleries may not have more than 5 associated images. Please try again.'}, status=400)
        return JsonResponse({ 'gallery': gallery.to_client() })
    return JsonResponse({ 'error': 'Server expects a POST request.'}, status=400)

def new_vote(request):
    if not request.user or not request.user.is_authenticated:
        return JsonResponse({ 'error': 'You must be signed in to vote!'}, status=400)

    gallery_id = request.POST.get('gallery')
    image_id = int(request.POST.get('image'))
    user = request.user

    try:
        vote = Vote.objects.get(
            gallery_id=gallery_id,
            user=user
        )
        return JsonResponse({ 'error': 'You may only vote once per gallery!' }, status=400)
    except Vote.DoesNotExist:
        vote = Vote.objects.create(
            gallery_id=gallery_id,
            user=user,
            image_id=image_id
        )
    
    return JsonResponse({ 'gallery': vote.gallery.to_client(), 'user_vote': image_id })
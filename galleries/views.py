from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage


from galleries.models import Gallery, Image
from galleries.forms import ImageForm

def home(request):
    return render(request, "base.html")

# # def create(request):
#     if request.POST:
#         title = request.POST.get('title')
#         gallery = Gallery.objects.create(title=title)
#         # for file in request.FILES.getlist('files'):
#         #     pass
#         return redirect(f'/gallery/{gallery.id}/')
    

def read(request, id):
    gallery = Gallery.objects.get(id=id)

    return JsonResponse({ 'gallery': gallery.to_client() })

def create(request):
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
                    print(form.errors)
            else:
                return JsonResponse({ 'error': 'Galleries may not have more than 5 associatd images. Please try again.'})
        return JsonResponse({ 'gallery': gallery.to_client() })
    return JsonResponse({ 'error': 'Server expects a POST request.'})
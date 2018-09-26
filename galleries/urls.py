from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView


from galleries import views as galleries_views

urlpatterns = [
    url(r'^api/gallery/new$', galleries_views.create, name='create'),
    url(r'^api/gallery/(\d+)/$', galleries_views.read, name='read'),
    url(r'^admin/', admin.site.urls),
    url(r'^', galleries_views.home, name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
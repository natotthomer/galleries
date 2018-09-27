from django.conf.urls import url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from galleries import views as galleries_views
from account import views as account_views

urlpatterns = [
    url(r'$^', galleries_views.home, name='home'),
    url(r'^api/gallery/new$', galleries_views.create_gallery, name='create_gallery'),
    url(r'^api/gallery/(\d+)/$', galleries_views.read_gallery, name='read_gallery'),
    url(r'^api/user/new$', account_views.create, name='create_user'),
    url(r'^api/user/sign_in$', account_views.sign_in, name='sign_in'),
    url(r'^api/user/sign_out$', account_views.sign_out, name='sign_out'),
    url(r'^api/vote$', galleries_views.new_vote, name='new_vote'),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += url(r'.*', galleries_views.home),
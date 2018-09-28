from django.db import models
from django.conf import settings

class Gallery(models.Model):
    def to_client(self):
        image_set = Image.objects.filter(gallery=self)
        images_json = [image.to_client() for image in image_set]
        
        return {
            'id': self.id,
            'images': images_json
        }

class Image(models.Model):
    file = models.FileField(upload_to='documents/')

    gallery = models.ForeignKey(
        Gallery, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        related_name='images'
    )

    def to_client(self):
        votes = self.vote_set.all().count()
        return {
            'url': self.file.url,
            'id': self.id,
            'votes': votes
        }

class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    gallery = models.ForeignKey(Gallery, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, default=None)

    class Meta:
        unique_together = ('user', 'gallery')

    def to_client(self):
        return {
            'gallery': self.gallery.id,
            'image': self.image.id,
            'user': self.user.id
        }
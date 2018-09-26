from django.db import models

class Gallery(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True, default='New Gallery')

    def to_client(self):
        image_set = Image.objects.filter(gallery=self)
        images_json = [image.file.url for image in image_set]
        
        return {
            'title': self.title,
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
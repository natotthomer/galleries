from django.db import models

class Gallery(models.Model):
    title = models.CharField(max_length=100)

class Image(models.Model):
    file = models.FileField(upload_to='documents/')

    gallery = models.ForeignKey(
        Gallery, 
        on_delete=models.CASCADE, 
        blank=True, 
        null=True,
        related_name='images'
    )
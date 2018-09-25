from django import forms
from galleries.models import Image, Gallery

class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('file', 'gallery')

        gallery = forms.ModelChoiceField(queryset=Gallery.objects.all(), required=False)
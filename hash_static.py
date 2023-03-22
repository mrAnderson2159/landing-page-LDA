import os
import django
# *************************************************************************
os.environ['DJANGO_SETTINGS_MODULE'] = 'landing_page_lda.settings'
django.setup()
print('\n' * 3)
# ***************************************

from django.templatetags.static import static
from landing_page_app.functions import encrypt
from landing_page_app.models import TextLayout, SiteHash
from landing_page_app.colors import green

if __name__ == '__main__':
    index_js = static('src/vue/dist/assets/index.js')[1:]
    index_css = static('src/vue/dist/assets/index.css')[1:]
    text_management = TextLayout.objects.get(name='text_layout').data

    with open(index_js, 'r') as js, open(index_css, 'r') as css:
        index_js_encrypted = encrypt(js.read())
        index_css_encrypted = encrypt(css.read())
    text_management_encrypted = encrypt(text_management)

    final_encrypt = encrypt(index_js_encrypted + index_css_encrypted + text_management_encrypted)

    sitehash = SiteHash.objects.get_or_create(name='site_hash')[0]
    if sitehash.value != final_encrypt:
        sitehash.value = final_encrypt
        sitehash.save()
        green('WEBSITE UPDATED')

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

def validate_zip_code(value):
    if len(value) != 8:
        raise ValidationError(
        _('%(value)s should have exactly 8 digits'),
        params={'value': value},
    )
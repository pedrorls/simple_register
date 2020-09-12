from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

def validate_cpf(value):
    if len(value) != 11:
        raise ValidationError(
        _('%(value)s should have exactly 11 digits'),
        params={'value': value},
    )

def validate_phone(value):
    if len(value) < 8 or len(value) >  15:
        raise ValidationError(
        _('%(value)s should have between 8 and 15 digits'),
        params={'value': value},
    )
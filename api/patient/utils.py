from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

def validate_cpf(value):
    if len(str(value)) != 11:
        raise ValidationError(
        _('%(value)s should have exaclty 11 digits'),
        params={'value': value},
    )

def validate_phone(value):
    if len(str(value)) < 8 or len(str(value)) >  15:
        raise ValidationError(
        _('%(value)s should have between 8 and 15 digits'),
        params={'value': value},
    )
from typing import Any


def text_field(value: Any,
               label: str,
               *,
               url: str = '',
               placeholder: str = '') -> dict:
    return {
        "value": value,
        "label": label,
        "url": url,
        "placeholder": placeholder,
    }


from rest_framework.exceptions import APIException

class DentistNotFoundException(APIException):
    status_code = 404
    default_detail = "Dentista no encontrado."
    default_code = "dentist_not_found"

    def __init__(self, detail=None, code=None):
        if detail is None:
            detail = self.default_detail
        if code is None:
            code = self.default_code
        super().__init__(detail, code)

from datetime import datetime, timezone

def verificar_formato_cita(fecha_cita):

    if fecha_cita is None:
        return False

    try:
        fecha_actual = datetime.now(timezone.utc)
        return fecha_cita > fecha_actual
    except (ValueError, TypeError):
        return False
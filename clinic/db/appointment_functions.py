from django.db import connection

def consultar_citas(nombre_esquema, id_paciente, id_doctor, id_secretaria, estado_cita, fecha_cita):
    query = """
        SELECT * FROM public.fnc_consultar_citas(%s, %s, %s, %s, %s, %s)
    """
    with connection.cursor() as cursor:
        cursor.execute(query, [nombre_esquema, id_paciente, id_doctor, id_secretaria, estado_cita, fecha_cita])
        columns = [col[0] for col in cursor.description]  # Obtener los nombres de las columnas
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]  # Transformar en una lista de diccionarios
    return results
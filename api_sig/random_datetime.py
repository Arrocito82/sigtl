import datetime
import random
start_date = datetime.datetime(2022, 1, 5, 8,tzinfo=datetime.timezone.utc) 
# Establece la fecha inicial a las 8 am del 3 de enero de 2022
end_date = datetime.datetime(2022, 1, 5, 19,tzinfo=datetime.timezone.utc) 
# Establece la fecha final a las 4 pm del 3 de enero de 2022
current_date = start_date # Inicializa la fecha actual con la fecha inicial
# RANGO DE SEGUNDOS ALEATORIOS
MIN_SEG=0
MAX_SEG=59
# MINUTOS ENTRE VENTAS
MIN_MINUTOS=0
MAX_MINUTOS=3
# HORAS MINUTOS ENTRE VENTAS EN HORA PICO
MIN_MINUTOS_HORA_PICO=0
MAX_MINUTOS_HORA_PICO=1
# PERIODO DE HORAS PICO
HORA_PICO_MIN_MANANA=11
HORA_PICO_MAX_MANANA=13
HORA_PICO_MIN_TARDE=17
HORA_PICO_MAX_TARDE=19
# HORA PICO 11-1, 5-7 

def get_current_time():
    global current_date, start_date,end_date
    
    segundos_aleatorio= random.randint(MIN_SEG, MAX_SEG)
    # verificando si es hora pico
    # print(type(current_date.hour))
    horas=current_date.hour
    if horas>HORA_PICO_MIN_MANANA and horas<HORA_PICO_MAX_MANANA or horas>HORA_PICO_MIN_TARDE and horas<HORA_PICO_MAX_TARDE:
        minutos_aleatorio= random.randint(MIN_MINUTOS_HORA_PICO, MAX_MINUTOS_HORA_PICO) 
    else:
        minutos_aleatorio= random.randint(MIN_MINUTOS, MAX_MINUTOS) 
    delta = datetime.timedelta(minutes=minutos_aleatorio,seconds=segundos_aleatorio) 
    current_date += delta # Añade el intervalo de tiempo a la fecha actual para obtener la siguiente fecha
    if current_date >= end_date: # Mientras la fecha actual sea menor que la fecha final
        current_date = start_date + datetime.timedelta(days=1)
        end_date = end_date + datetime.timedelta(days=1)
        current_date += delta # Añade el intervalo de tiempo a la fecha actual para obtener la siguiente fecha
    return current_date


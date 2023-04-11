import datetime
import random
# class RandomDateTime(object):
start_date = datetime.datetime(2022, 1, 4, 8) 
# Establece la fecha inicial a las 8 am del 3 de enero de 2022
end_date = datetime.datetime(2022, 1, 4, 16) 
# Establece la fecha final a las 4 pm del 3 de enero de 2022
current_date = start_date # Inicializa la fecha actual con la fecha inicial
# Rango de tiempo aleatorio preferido
MIN_MINUTOS=0
MAX_MINUTOS=3
MIN_MINUTOS_HORA_PICO=0
MAX_MINUTOS_HORA_PICO=1
MIN_SEG=0
MAX_SEG=59
# HORA PICO 11-1, 5-7 

def get_current_time():
    minutos_aleatorio= random.randint(MIN_MINUTOS, MAX_MINUTOS) 
    segundos_aleatorio= random.randint(MIN_SEG, MAX_SEG) 
    # Genera un número aleatorio entre 15 y 95 (ambos incluidos)
    delta = datetime.timedelta(minutes=minutos_aleatorio,seconds=segundos_aleatorio) 
    global current_date, start_date,end_date
    # Establece un intervalo de tiempo de 15 minutos
    current_date += delta # Añade el intervalo de tiempo a la fecha actual para obtener la siguiente fecha
    if current_date >= end_date: # Mientras la fecha actual sea menor que la fecha final
        current_date = start_date + datetime.timedelta(days=1)
        end_date = end_date + datetime.timedelta(days=1)
        current_date += delta # Añade el intervalo de tiempo a la fecha actual para obtener la siguiente fecha
    return current_date


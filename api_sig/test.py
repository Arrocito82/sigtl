import random_datetime

for n in range(50):
    print(random_datetime.get_current_time().strftime("%Y-%m-%d %H:%M:%S.%f+00"))
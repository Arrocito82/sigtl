import random_datetime

for n in range(200):
    print(random_datetime.get_current_time().strftime("n. "+str(n)+" %Y-%m-%d %H:%M:%S.%f+00"))
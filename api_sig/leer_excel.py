#import xlrd

#Metodo para leer xlsx-------------

#filePath="Libro1.xlsx"

#openFile = xlrd.open_workbook(filePath)

#sheet = openFile.sheet_by_name("Hoja1")

#print("No de filas", sheet.nrows)

#print("No de columnas", sheet.ncols)

#for i in range(sheet.nrows):
#    print(sheet.cell_value(i,0), "     ", sheet.cell_value(i,1))


#metodo para leer csv-----------------
import csv

f = open('movimientos.csv')
lines = csv.reader(f)
for line in lines:
    print(str(line[0]), '|', str(line[1]), '|',str(line[2]), '|',str(line[3]), '|',str(line[4]), 
          '|',str(line[5]), '|',str(line[6]), '|',str(line[7]), 
          '|',str(line[8]))
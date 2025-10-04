using System;
using System.IO; // Asegúrate de incluir este espacio de nombres
using System.Linq; // Necesario para el método .Count()

class Program
{
    static void Main(string[] args)
    {
        //string rutaArchivo = @"C:\ruta\a\tu\play.txt"; C:\Users\batah\OneDrive\Documents\LOCs\LOCs\txt
        string rutaArchivo = @"C:\Users\batah\OneDrive\Documents\LOCs\LOCs\txt\play1.txt";
        try
        {
            // Lee todas las líneas del archivo y cuenta cuántas hay
            int numeroLineas = File.ReadLines(rutaArchivo).Count();

            Console.WriteLine($"El archivo '{rutaArchivo}' tiene {numeroLineas} líneas.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine($"Error: El archivo no se encontró en la ruta especificada: {rutaArchivo}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ocurrió un error al leer el archivo: {ex.Message}");
        }
    }
}


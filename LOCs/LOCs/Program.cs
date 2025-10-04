using System;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

class Program
{
    static void Main(string[] args)
    {
        // Ruta del archivo a analizar
        string rutaArchivo = @"C:\Users\batah\OneDrive\Documents\LOCs\LOCs\txt\play1.txt";

        try
        {
            // Lee todas las líneas
            var lineas = File.ReadAllLines(rutaArchivo);

            // 1. Contar solo líneas que NO estén vacías ni sean espacios
            int numeroLineas = lineas.Count(l => !string.IsNullOrWhiteSpace(l));

            // 2. Contar funciones/métodos usando Regex básico
            // Patrón busca palabras clave + un nombre + paréntesis ()
            //Que es Regex "Detecta si una línea de código parece una función"
            Regex regexFuncion = new Regex(@"\b(public|private|protected|internal|static)\s+[\w\<\>\[\]]+\s+\w+\s*\(.*\)");

            int numeroFunciones = lineas.Count(l => regexFuncion.IsMatch(l));

            // Mostrar resultados
            Console.WriteLine($"El archivo '{rutaArchivo}' tiene {numeroLineas} líneas (sin contar espacios).");
            Console.WriteLine($"El archivo contiene {numeroFunciones} funciones/métodos.");
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

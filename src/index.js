//Dupa ce am vazut taskul am incercat sa divizez acest task in mai multe bucati.Logica a fost urmatoarea.
//1-am avut nevoie de o constanta pe care am denumit,o counties in care am introdus abrevierile tuturor judetelor din romania.
//2-Am creeat o alta constanta si am copiat din cerinta tabelul de conversie trimis de voi.

const counties = [
    "AB",
    "AR",
    "AG",
    "BC",
    "BH",
    "BN",
    "BT",
    "BV",
    "BR",
    "BZ",
    "CS",
    "CL",
    "CJ",
    "CT",
    "CV",
    "DB",
    "DJ",
    "GL",
    "GR",
    "GJ",
    "HR",
    "HD",
    "IL",
    "IS",
    "IF",
    "MM",
    "MH",
    "MS",
    "NT",
    "OT",
    "PH",
    "SM",
    "SJ",
    "SB",
    "SV",
    "TR",
    "TM",
    "TL",
    "VS",
    "VL",
    "VN",
]

const digitLetterConv = {
    1: "I",
    2: "Z",
    3: "E",
    4: "A",
    5: "S",
    6: "G",
    7: "T",
    0: "O"
}

let licensePlates = [];

//3-Am dat functionalitate butoanelor creeate in HTML,am creat Event Listener ca atunci cand se activeaza acel buton functia
//liceseGen sa fie activata si sa inceapa rularea.
//4-GetElementById creeaza o referinta la un element HTML cu Id de incarcare.
//5-Aceasta bucata de cod are menirea sa genereze informatiile din  functia LicenseGen 
const btn = document.getElementById("generate")
btn.addEventListener("click", licenseGen)
const loading = document.getElementById("loading")
const remove = document.getElementById("remove")
const totalTime = document.getElementById("total-time")
remove.addEventListener("click" , removeList)
const list = document.getElementById("list")
//6-Am creat o functie asincrona->este folosita pentru a gestiona rezultatul functiei atunci cand acesta este finalizata.
//fetchData este o functie asincrona care ia date de la un server folosind ApiFetch, 
//,care poate efectua sarcini de lunga durata fara a bloca executia altui cod.
//Await este folosit pentru executia functiei pana cand raspunsul este primit si analizat ca Json.Functia returneaza datele analizate,
//ca o promisiune care este gestionata de metodele try and catch.
async function licenseGen(){
   const sTime = performance.now()

   btn.style.display = "none"
   remove.style.display = "none"
   loading.style.display = "block"
   totalTime.style.display = "none"

    //Pentru ca functia mea sa aiba in componenta elemente care ajuta la generarea cuvintelor din lista am creat o functie asincrona fetch
//intr,un bloc de cod try and catch

    try{
    
   const response = await fetch('https://raw.githubusercontent.com/mgax/dexonline-scrabble/master/words.txt')
   const data = await response.text() //aici se transforma cuvintele in tip text din API 

   //Fecth,ul functioneaza corect, verificand,ul cu console.log(data), returnand toate cuvintele din link
   //In urmatoarul pas am incercat sa creez o metoda de filtrare a cuvintelor, am creat o functie :
   //Functia filterWord are in componenta sa 2 argumente, words si filterFn.
   //Words este un sir de caractere ce reprezinta cuvintele
   //FilterFn este o functie de filtrare
   //Fuctia filter word face urmatoarele actiuni: word.split separa sirul de cuvinte din words,
   //utilizand caracterul \n ca linie noua ca se separator si returneaza un array de cuvinte.
   //filter(filterFn) filtreaza array,ul de cuvinte si returneaza doar cuvintele care indeplinesc anumite cerite de mai jos 
   //functia filterWords divizeaza cuvintele primite,si apoi aplica functia de filtrare
   //pentru a selecta doar cuvintele care accepta urmatoarele conditii.
   const filterWords = (words, filterFn) => {
    return words
    .split('\n')
    .filter(filterFn)
   }
  

   //Pentru ca am creeat functia de filtrare a cuvintelor acum e timpul sa ii punem 
   //condiitile pentru filtrare:
   //Am creeat o functie pentru abrevierile judetelor in afara de bucuresti
   //FilterWords este functia care imi filtreaza cuvintele din array
   //data este un parametru de tip text ce contine cuvintele din fetch
   //word este al doilea parametru care specifica conditii de filtrare a functiei
   //counties.some(county => word.startsWith(county))" - cuvântul trebuie să înceapă cu unul dintre codurile de județ definite în array-ul "counties".
   //Object.values(digitLetterConv).some(value => word.charAt(2) === value)" - a treia literă a cuvântului trebuie să se regăsească în valorile obiectului "digitLetterConv".
   //providenceWords contine un array cu cuvintele care respecta conditiile de filtrare
   //metoda some verifica daca cel putin un array indeplineste conditia specificata.
   const provinceWords = filterWords(data, word => 
    word.length === 7 &&
    counties.some(county => word.startsWith(county)) &&
    Object.values(digitLetterConv).some(value => word.charAt(2)=== value)&&
    Object.values(digitLetterConv).some(value => word.charAt(3)=== value))


    //Pentru a putea sorta doar cuvintele care incep cu litera B si sa aiba 2 sau 3 cifre 
    //am fost nevoit sa creeez  o alta variabila cu conditii asemanatoare
    //"data" - este un parametru ce reprezintă un text ce conține cuvintele dintr-o sursă externă.
    //"word" - este un parametru de tip funcție ce specifică condițiile de filtrare a cuvintelor.
    //"(word.length === 7 || word.length === 6)" - lungimea cuvântului trebuie să fie fie 7 caractere, fie 6 caractere.
    //word.charAt(0) === "B"" - Verifica daca prima litera a cuvantul este egala cu B 
    //"Object.values(digitLetterConv).some(value => word.charAt(1) === value)" - a doua literă a cuvântului trebuie să se regăsească în valorile obiectului "digitLetterConv".
    //metoda some verifica daca cel putin un array indeplineste conditia specificata.
    //"Object.values(digitLetterConv).some(value => word.charAt(2) === value)" - a treia literă a cuvântului trebuie să se regăsească în valorile obiectului "digitLetterConv".
    //(word.length !== 7 || Object.values(digitLetterConv).some(value => word.charAt(3) === value))" - dacă lungimea cuvântului este diferită de 7 caractere, atunci a patra literă trebuie să se regăsească în valorile obiectului "digitLetterConv".

    const bucharestWords = filterWords(data, word =>
    (word.length === 7 || word.length === 6)&&
    word.charAt(0) === "B" &&
    Object.values(digitLetterConv).some (value => word.charAt(1)=== value)&&
    Object.values (digitLetterConv).some(value => word.charAt(2) === value)&&
    (word.length !== 7 || Object.values(digitLetterConv).some(value => word.charAt(3)=== value))
    )

    //Am avut nevoie de o functie care sa,mi extraga toate valorile din tabelul de conversiee pentru a
    //le putea transforma intr,un array.
    //Am facut o conversie intre un caracter char si indexul asociat acestui obiect.
    //Folosește metoda Object.values(digitLetterConv) pentru a extrage toate valorile obiectului digitLetterConv și le transformă într-un array.
    //Am aplicat  metoda indexOf(char) asupra acestui array pentru a căuta indexul la care se găsește caracterul char.
    //Returnează indexul găsit.Prin aceasta functie am realizat o conversie intr un caracter char si indexul asociat acestuia
    const digitLetterConverter = char => {
        const index = Object.values(digitLetterConv).indexOf(char)
        return index
    } 

    //Pentru a compune placuta cu nr am avut nevoie de o functie care sa imi converteasca informatiile primite
    //fuctia plateConverter primeste 2 argumente.
    //am creeat o alta constata convertedWord care contie placutele convertite
    //am folosit metoda map pentru a itera prin arrayul words
    //am creeat o constanta pentru a extrage din abrevierile de judet.
    //word.slice(0, slice) extrage o porțiune (subșir) din word, începând de la indexul 0 și până la indexul slice. Rezultatul este atribuit variabilei county
    //De exemplu, dacă word este "ABCD123" și slice este 2, expresia word.slice(0, slice) va returna subșirul format din primele 2 caractere ale cuvântului, adică "AB".
    //Expresia word.charAt(slice === 1 ? 1 : 2) accesează caracterul din word la indexul 1 sau 2, în funcție de valoarea lui slice. Dacă slice este egal cu 1, se accesează caracterul de la indexul 1, altfel se accesează caracterul de la indexul 2.
    // /Rezultatul obținut prin word.charAt(slice === 1 ? 2 : 3) este apoi trimis ca argument către funcția digitLetterConverter(), iar rezultatul este atribuit variabilei secondIndex.
    //În concluzie, în funcție de condiția specificată, variabila thirdIndex va primi rezultatul apelului funcției digitLetterConverter(word.charAt(3)) sau valoarea null.
    //${letters} reprezintă valoarea variabilei letters, care reprezintă ultimele trei litere ale plăcii de înmatriculare.

    const wordLicensePlateConverter = (words, slice) => {
        const convertedWords = words.map(word => {
            const county = word.slice(0, slice)
            const firstIndex = digitLetterConverter(word.charAt(slice === 1 ? 1 : 2)) //operatori ternari.Structura generală este: condiție ? valoareDacăAdevărat : valoareDacăFals.  
            const secondIndex = digitLetterConverter(word.charAt(slice === 1 ? 2 : 3))
            const thirdIndex = slice === 1 && word.length === 7 ? digitLetterConverter(word.charAt(3)) : null
            const letters = word.slice(-3)

            const licensePlate = `${county} ${firstIndex}${secondIndex}${(thirdIndex && thirdIndex > 0) ? thirdIndex : ""} ${letters}`

            return licensePlates.push(licensePlate)
        })
    }

    //wordLicensePlateConverter(provinceWords, slice = 2) apelează funcția wordLicensePlateConverter cu
    // argumentele provinceWords și slice = 2. Acest lucru înseamnă că se vor converti cuvintele din 
    //provinceWords în plăci de înmatriculare folosind o valoare de tăiere (slice) de 2. 
    //Presupunând că provinceWords este un array de cuvinte, 
    //funcția wordLicensePlateConverter va itera prin cuvinte și va crea plăci de înmatriculare în 
    //conformitate cu logica definită în cod.
    wordLicensePlateConverter(provinceWords, slice = 2)
    wordLicensePlateConverter(bucharestWords, slice = 1)

    //se face reverse la ce am facut mai sus,Loading dispare iar celelate apar.
    btn.style.display = "block"
    loading.style.display = "none"
    remove.style.display = "block"
    totalTime.style.display = "block"

    const listItems = licensePlates.map((item) => `<li>${item}</li>`).join("") //se compune lista ca sa apara pe ecran.Join desfinteaza array si returneaza 
                                                                              //o lista intreaga.Concateneaza un array si da un string.
    const orderedList = `<ol>${listItems}</ol>`  //se creaaza o order list 

    const eTime = performance.now() //se incheie cronometrarea functiei.
    const tTime = (eTime - sTime) / 1000 //calculeaza cat a durat exacutarea functiei si se imparte la 1000 pt a primi secunde in loc de milisecunde.
    totalTime.innerHTML = `Time taken to generate the list: ${tTime.toFixed(2)} seconds` //un element span afiseaza 2 zecimale.

    return list.innerHTML = orderedList //returneaza intreaga lista de placute

}catch(error){
    console.log(error)
    alert('Something went wrong while getting the source words. Please try again.')
}

}


function removeList() {
    list.innerHTML = ''
    totalTime.innerHTML = ''
}

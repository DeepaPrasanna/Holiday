const form = document.getElementById('user-form');
form.addEventListener('submit', handleForm);

const displayHolidays = document.getElementById('save-button')
displayHolidays.addEventListener('click', fetchHolidays)

let countryName,year,monthNo;

let holidayTable = document.getElementById('holiday-table')

function handleForm(event) {
    event.preventDefault();
    countryName = document.getElementById('country-name').value
    monthNo = document.getElementById('month-name').value
    year = document.getElementById('year').value
}




async function fetchHolidays(){

    let response = await fetch("https://calendarific.com/api/v2/countries?api_key=aa1460928754b0eded9dee37d5b6474e4e7319d8")
    const data = await response.json()
    let countries = data.response.countries
    let country,country_code
    for (country in countries){
        if ((countries[country].country_name).toLowerCase() == (countryName).toLowerCase())
        {
            country_code = countries[country]['iso-3166']
            break;
        }
    }

    let holidays = await fetch(`https://calendarific.com/api/v2/holidays?api_key=aa1460928754b0eded9dee37d5b6474e4e7319d8&country=${country_code}&year=${year}&month=${monthNo}`)
    const holidayData = await holidays.json()

    let name,day;
    let table = document.createElement("TABLE")
    table.classList.add("ui")
    table.classList.add("violet")
    table.classList.add("table")

    let thead = document.createElement("THEAD")
    let theadRow = document.createElement("TR")
    let head1 = document.createElement("TH")
    let head2 = document.createElement("TH")
    // head1.classList.add("two")
    // head2.classList.add("two")
    // head1.classList.add("wide")
    // head2.classList.add("wide")

    head1Text = document.createTextNode("Name")
    head2Text = document.createTextNode("Day")
    head1.appendChild(head1Text)
    head2.appendChild(head2Text)
    theadRow.appendChild(head1)
    theadRow.appendChild(head2)
    thead.appendChild(theadRow)
    table.appendChild(thead)

    let tbody = document.createElement("TBODY")

    for( holiday in holidayData.response.holidays){
        name = holidayData.response.holidays[holiday].name
        day= holidayData.response.holidays[holiday].date.datetime.day
        console.log(day,name)
        let tbodyRow = document.createElement("TR")
        let td1 = document.createElement("TD")
        let td2 = document.createElement("TD")

        td1Text = document.createTextNode(name)
        td2Text = document.createTextNode(day)
        td1.appendChild(td1Text)
        td2.appendChild(td2Text)

        tbody.appendChild(tbodyRow)
        tbodyRow.appendChild(td1)
        tbodyRow.appendChild(td2)

        table.appendChild(tbody)
        holidayTable.appendChild(table)

    }

}

console.log('hello world');

dawaAutocomplete.dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
  select: function(selected) {
    document.getElementById('selected-address').innerHTML = selected.tekst;
    console.log('Valgt adresse: ' + selected.tekst);
  }
});


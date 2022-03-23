
dawaAutocomplete.dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
  select: function(selected) {
    document.getElementById('selected-address').innerHTML = selected.tekst;
  }
});


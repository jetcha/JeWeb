function blogFilter() {
  // Variable declaration
  let input = document.getElementById("search-bar");
  let filter = input.value.toUpperCase();
  let rowWrapper = document.getElementsByClassName("list-row-wrapper");
  let rightWrapper = document.getElementsByClassName("list-right-wrapper");

  // Go through each item
  for (i = 0; i < rightWrapper.length; i++) {
    let h2 = rightWrapper[i].getElementsByTagName("h2");
    // Get the text in the link
    let a = h2[0].getElementsByTagName("a")[0];
    let txtValue = a.textContent || a.innerText;
    console.log(txtValue);
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      rowWrapper[i].style.display = "";
    } else {
      rowWrapper[i].style.display = "none";
    }
  }
}

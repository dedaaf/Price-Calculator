jQuery(document).ready(function($) {

    $("#eerstePME").bootstrapSwitch(); //Bootstrap Switch
    $("#htmlPME").bootstrapSwitch();

    $("#cloud").bootstrapSwitch();
    //$('#eerstePME').is(':checked');
    $('#eerstePrijs').val(0);
    $('#htmlPrijs').val(0);
    $('#totalppmeachat').value = 1;

    $('#extraPME').val(0);
    $('#viewerPME').val(0);
    $('#mobilePME').val(0);
    $('#amountResourcesWeb').val(0);

    var priceViewerperStuk = 0;
    $('#priceViewer_prijsperstuk').text(priceViewerperStuk.toFixed(2));

    var extraPrijsperStuk = 0;
    $('#extraPME_prijsperstuk').text(extraPrijsperStuk.toFixed(2));

    var reduction = 0;
    var support = 0;
    var facteur_ln = 10;
    var facteur_viewer = 5;
    var numberExtra = 0;
    var numberViewer = 0;

    var prijsEerste = 0;
    var priceViewer = 0;
    var extraPrijs = 0;

    var number_devices = 0;
    var priceMobilePricePerMonth = 0;
    var yearPriceMobile = 0;
    var priceHTML = 0;

    var nbressources = 0;
    var resourcesRange;
    var min = 0,
        max = 0;
    var priceWebLocal_Total = 0;
    var priceWebCloud_Total = 0;


    var subtotalLicenses = 0;
    var subtotal = 0;
    var total = 0;

    var webAccessPrice = {
        priceWebLocal: {
            "0-9": 1490,
            "10-19": 2190,
            "20-29": 2890,
            "30-39": 3590,
            "40-49": 4290,
            "50-74": 5240,
            "75-99": 6190,
            "100-149": 7390,
            "150-199": 8590,
            "200-249": 9790,
            "250-299": 10990,
            "300-399": 12590,
            "400-499": 14190,
            "500-599": 15790,
            "600-699": 17390,
            "700-799": 18990,
            "800-899": 20590,
            "900-999": 22190
        },
        priceWebCloud: {
            "0-9": 468,
            "10-19": 708,
            "20-29": 948,
            "30-39": 1188,
            "40-49": 1428,
            "50-74": 1788,
            "75-99": 2148,
            "100-149": 2628,
            "150-199": 3108,
            "200-249": 3588,
            "250-299": 4068,
            "300-399": 4788,
            "400-499": 5508,
            "500-599": 6228,
            "600-699": 6948,
            "700-799": 7668,
            "800-899": 8388,
            "900-999": 9108
        }
    };

    $(".form-control.berekening").on('keyup change switchChange.bootstrapSwitch', function() {

        if ($('#eerstePME').is(':checked')) {
            prijsEerste = 490;
        } else {
            prijsEerste = 0;
        }
        $('#eerstePrijs').val(prijsEerste);
        //end first

        numberExtra = parseInt($('#numberExtraPME').val());
        if (numberExtra > 0) {
            if (numberExtra == 1) {
                extraPrijs = 240;
                //soustotal_ppme = soustotal_ppme + 240
            } else if (numberExtra > 1) {
                reduction = Math.round(Math.log(numberExtra + 1) * (facteur_ln + ((numberExtra + 1.00) / 100.0)));
                if (reduction > 55) {
                    reduction = 55;
                }
                extraPrijs = 240 * numberExtra - 240 * (numberExtra - 1) * reduction / 100;
            }
            //berekening prijs per stuk
            extraPrijsperStuk = extraPrijs / numberExtra;
        } else {
            numberExtra = 0;
            extraPrijs = 0;
            extraPrijsperStuk = 0;
        }
        $('#numberExtraPME').val(numberExtra);
        $('#extraPME_prijsperstuk').text(extraPrijsperStuk.toFixed(2));
        $('#extraPrijs').val(parseInt(extraPrijs));
        //end extra 

        numberViewer = parseInt($('#number_viewerPME').val());
        if (numberViewer > 0) {
            reduction = Math.round(Math.log(numberViewer) * (facteur_viewer + ((numberViewer) / 100.0)));
            if (reduction > 50) {
                reduction = 50;
            }

            priceViewer = 99 * numberViewer - 99 * numberViewer * reduction / 100;

            //berekening prijs per stuk
            priceViewerperStuk = parseInt(priceViewer / numberViewer);
        } else {
            numberViewer = 0;
            priceViewer = 0;
            priceViewerperStuk = 0;
        }

        $('#number_viewerPME').val(numberViewer);
        $('#priceViewer_prijsperstuk').text(priceViewerperStuk.toFixed(2)); //print price per stuk 
        $('#viewerPrijs').val(parseInt(priceViewer)); //print viewer price in the price field
        //end viewer

        if ($('#htmlPME').is(':checked')) {
            priceHTML = 790;
        } else {
            priceHTML = 0;
        }
        $('#htmlPrijs').val(priceHTML);
        //end html

        number_devices = parseInt($('#mobilePME').val());
        if (number_devices > 0) {
            if ((number_devices > 0) && (number_devices <= 25)) {
                priceMobilePricePerMonth = number_devices * 9;
            } else if ((number_devices >= 26) && (number_devices <= 49)) {
                priceMobilePricePerMonth = number_devices * 8;
            } else if ((number_devices >= 50) && (number_devices <= 74)) {
                priceMobilePricePerMonth = number_devices * 7;
            } else if ((number_devices >= 75) && (number_devices <= 99)) {
                priceMobilePricePerMonth = number_devices * 6;
            } else if ((number_devices >= 100) && (number_devices <= 149)) {
                priceMobilePricePerMonth = number_devices * 5;
            } else if ((number_devices >= 150) && (number_devices <= 199)) {
                priceMobilePricePerMonth = number_devices * 4.5;
            } else if ((number_devices >= 200) && (number_devices <= 249)) {
                priceMobilePricePerMonth = number_devices * 4;
            } else if ((number_devices >= 250) && (number_devices <= 299)) {
                priceMobilePricePerMonth = number_devices * 3.5;
            } else if ((number_devices >= 300) && (number_devices <= 349)) {
                priceMobilePricePerMonth = number_devices * 3;
            }

            yearPriceMobile = priceMobilePricePerMonth * 12;

        } else {
            number_devices = 0;
            yearPriceMobile = 0;
        }
        $('#mobilePME').val(number_devices);
        $('#mobielePrijs').val(yearPriceMobile);
        //end mobile

        nbressources = parseInt($('#amountResourcesWeb').val());
        if (nbressources > 0) {
            if ((nbressources > 0) && (nbressources <= 9)) {
                min = 0, max = 9;
            } else if ((nbressources >= 10) && (nbressources <= 19)) {
                min = 10, max = 19;
            } else if ((nbressources >= 20) && (nbressources <= 29)) {
                min = 20, max = 29;
            } else if ((nbressources >= 30) && (nbressources <= 39)) {
                min = 30, max = 39;
            } else if ((nbressources >= 40) && (nbressources <= 49)) {
                min = 40, max = 49;
            } else if ((nbressources >= 50) && (nbressources <= 74)) {
                min = 50, max = 74;
            } else if ((nbressources >= 75) && (nbressources <= 99)) {
                min = 75, max = 99;
            } else if ((nbressources >= 100) && (nbressources <= 149)) {
                min = 100, max = 149;
            } else if ((nbressources >= 150) && (nbressources <= 199)) {
                min = 150, max = 199;
            } else if ((nbressources >= 200) && (nbressources <= 249)) {
                min = 200, max = 249;
            } else if ((nbressources >= 250) && (nbressources <= 299)) {
                min = 250, max = 299;
            } else if ((nbressources >= 300) && (nbressources <= 399)) {
                min = 300, max = 399;
            } else if ((nbressources >= 400) && (nbressources <= 499)) {
                min = 400, max = 499;
            } else if ((nbressources >= 500) && (nbressources <= 599)) {
                min = 500, max = 599;
            } else if ((nbressources >= 600) && (nbressources <= 699)) {
                min = 600, max = 699;
            } else if ((nbressources >= 700) && (nbressources <= 799)) {
                min = 700, max = 799;
            } else if ((nbressources >= 800) && (nbressources <= 899)) {
                min = 800, max = 899;
            } else if ((nbressources >= 900) && (nbressources <= 999)) {
                min = 900, max = 999;
            } else if (nbressources > 999) {
                nbressources = 999;

                min = 900, max = 999;
            }

            if ($('#cloud').is(':checked')) {
                priceWebCloud_Total = webAccessPrice.priceWebCloud[min + "-" + max];
                priceWebLocal_Total = 0;
                $('#webPrijs').val(priceWebCloud_Total);
            } else {
                priceWebLocal_Total = webAccessPrice.priceWebLocal[min + "-" + max];
                priceWebCloud_Total = 0;
                $('#webPrijs').val(priceWebLocal_Total);
            }

        } else {
            nbressources = 0;
            priceWebCloud_Total = 0;
            priceWebLocal_Total = 0;
            $('#webPrijs').val(priceWebLocal_Total);
        }

        $('#amountResourcesWeb').val(nbressources);
        resourcesRange = min + " - " + max; //PRINT STRING WITH THE AMOUNT OF RESOURCES
        $('#resource_bereik').text(resourcesRange);

        //end web		

        //	soustotal = soustotal + parseInt(priceWebAccess_Total); //add webaccess price to subtotal
        subtotalLicenses = prijsEerste + extraPrijs + priceViewer + priceHTML + priceWebLocal_Total;
        subtotal = subtotalLicenses + yearPriceMobile + priceWebCloud_Total;

        $('#subtotalprijs').val(parseInt(subtotal));

        support = parseInt(subtotalLicenses) * 25 / 100; //calculate support
        $('#supportPrijs').val(parseInt(support));

        total = subtotal + support; //calulate totalprice: support + total licenses		
        $('#totaalprijs').val(parseInt(total));
    });


});
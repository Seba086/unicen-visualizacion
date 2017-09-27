$(document).ready(function(){
        $('a[data-toggle="tooltipTop"]').tooltip({
            animated: 'fade',
            placement: 'top',
            html: true
        });
        $('a[data-toggle="tooltipBottom"]').tooltip({
            animated: 'fade',
            placement: 'bottom',
            html: true
        });
                $('a[data-toggle="tooltipRight"]').tooltip({
            animated: 'fade',
            placement: 'right',
            html: true
        });
});
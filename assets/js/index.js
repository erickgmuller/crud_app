$("#add_user").submit(function(event){
    alert('Participante incluído com sucesso!');
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array,function(n,i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url":'http://localhost:3000/api/users/' + data.id,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(reponse){
        alert('Informações atualizadas com sucesso!')
    })
    
})

if(window.location.pathname == "/"){

    // Click Delete button
    $ondelete = $(".table tbody td a.delete");

    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":'http://localhost:3000/api/users/' + id,
            "method": "DELETE",
        }

        if(confirm("Você quer realmente deletar esse participante?")){
            
            $.ajax(request).done(function(reponse){
                alert('Participante deletado com sucesso!');
                location.reload()
            })
        }
    })

    // Click "Sortear" button
    $sortear = $(".table tbody td a.sortear");

    $sortear.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url":'http://localhost:3000/api/users/' + id,
            "method": "GET",
        }

        if(confirm("Você quer realmente fazer o sorteio com esses participantes?")){
            
            $.ajax(request).done(function(reponse){
                alert('Participante deletado com sucesso!');
                location.reload()
            })
        }
    })
}
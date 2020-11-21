$(document).ready(function(){

    $("#editnews").dataTable();


        var id = "";
               
                $(".btn-danger").click(function(){
                    console.log("Clicked on danger button");
                    id = this.id;
                    id = id.slice(6,id.length);
                    console.log("The Length of the id is "+id);
                    var newstitle = $("#"+id+" td:nth-child(1)").text();
                    var newsdescription = $("#"+id+" td:nth-child(2)").text();
                    var newspublishedat = $("#"+id+" td:nth-child(3)").text();
                    console.log("Title element is")
                    console.log(newspublishedat);
                    $("#editnewstitle").val(newstitle);
                    $("#editnewsdescription").val(newsdescription);
                    $("#editnewspublishedat").val(newspublishedat);

                        $("#savechanges").click(function(){
                            
                            var editedtitle = $("#editnewstitle").val();
                            var editeddescription = $("#editnewsdescription").val();
                            var editedpublishedat = $("#editnewspublishedat").val();

                            details={
                                oldtitle: id,
                                title: editedtitle,
                                description: editeddescription,
                                publishedat:editedpublishedat
                            }

                                    $.ajax({
                                        url: "/editnews/savechanges",
                                        type:"POST",
                                        data: details,
                                        success:function(result){
                                            if(result=="nothing modified"){
                                                alert("Please enter the updated details")
                                            }
                                            else{
                                                $("#"+id+" td:nth-child(1)").val(result.title);
                                                $("#"+id+" td:nth-child(2)").val(result.description);
                                                $("#"+id+" td:nth-child(3)").val(result.publishedat);
                                                window.location.reload();
                                            }

                                        }

                                    })
                        });
            
                });

});
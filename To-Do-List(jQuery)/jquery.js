$(document).ready(function(){
    $('#input').focus();
    $('#all').prop('checked', false);
    let taskCount = 0;



    // To get the current cursor position
    function getCursorPosition(event) {
        const x = event.clientX;
        const y = event.clientY;
        return [x, y];
    }

    function getRandomLightColor() {
        // Generate random values for each RGB component (between 200 and 255)
        const red = Math.floor(Math.random() * 56) + 200; // 200-255
        const green = Math.floor(Math.random() * 56) + 200; // 200-255
        const blue = Math.floor(Math.random() * 56) + 200; // 200-255
    
        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;
    
        return color;
    }


    $('#input').change(function(){
        let input = $(this).val();

         // Generate random values for top and right properties
        const randomTop = Math.floor(Math.random() * (window.innerHeight - 50)) + 1;
        const randomRight = Math.floor(Math.random() * (window.innerWidth - 300)) + 1;

        // Call the function to get a random light color
        const randomLightColor = getRandomLightColor();

        const task = $(`<div class="task" id="task-${taskCount}">
            <i class="fa fa-thumb-tack" aria-hidden="true"></i>
            <p>${input}</p>
            <i class="fa fa-check" aria-hidden="true"></i> 
            <i class="fa fa-trash" aria-hidden="true"></i>
        </div>`);

        // Set the top and right properties using CSS
        task.css({
            'top': `${randomTop}px`,
            'right': `${randomRight}px`,
            'background-color': `${randomLightColor}`,
            'z-index': '1'         
        });

        // Append the task element to the body
        $('body').append(task);
        taskCount++;

        $(this).val('');
    });
    

    // To make the selected task appear first in-order
    $('body').on('click', '.task', function(){
        $(this).css('z-index', '2');
        // Set the z-index of all other .task elements to 1
        $('.task').not(this).css('z-index', '1');
    });

    // When add task bar clicked it will appear first in-order
    $('body').on('click', 'main', function(){
        $(this).css('z-index', '2');
        $('.task').css('z-index', '1');
    });

    // To mark it as done the selected task
    $('body').on('click', '.fa-check', function(){
        // Find the <i> tag child element within the closest .task
        const iconElement = $(this).closest('.task').find('i');
        iconElement.css('color', 'white');
        
        $(this).closest('.task').css({
            'background-color': 'rgb(37, 37, 37)',
            'color': 'white',
            'border': 'none',
            'opacity': '0.5'
        }); 

        // Remove the third child element (index 2)
        const checkIcon = $(this).closest('.task').children().eq(2);
        checkIcon.remove();       
    });

    // To delete selected task
    $('body').on('click', '.fa-trash', function(){
        $(this).closest('.task').remove();
    });

    // To highlight all task when checked
    $('#all').change(function(){
        // Check if the checkbox is checked
        if ($(this).prop('checked')) {
            // Add a class to highlight all .task elements
            $('.task').addClass('highlighted');
        } else {
            // Remove the class to remove the highlight
            $('.task').removeClass('highlighted');
        }
    });

    // Select all done
    $('body').on('click', '.check-btn', function(){
        const iconElement = $('.task').find('i');
        iconElement.css('color', 'white');

        if ($('#all').prop('checked')) {
            // Mark all as done
            $('.task').css({
                'background-color': 'rgb(37, 37, 37)',
                'color': 'white',
                'border': 'none',
                'opacity': '0.5'
            });
        }

        // Remove the third child element (index 2) in each .task element
        $('.task').each(function() {
            const checkIcon = $(this).children().eq(2);
            checkIcon.remove();
        });

        // Uncheck the checkbox
        $('#all').prop('checked', false);
        // Remove highlight
        $('.task').removeClass('highlighted');
    });

    // Delete all done
    $('body').on('click', '.delete-btn', function(){
        if ($('#all').prop('checked')) {
            // Delete all
            $('.task').remove();
        }

        $('#all').prop('checked', false);
    });
});
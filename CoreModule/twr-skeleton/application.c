// Tower Kit documentation https://tower.hardwario.com/
// SDK API description https://sdk.hardwario.com/
// Forum https://forum.hardwario.com/

#include <application.h>

// LED instance
twr_led_t led;

// Button instance
twr_button_t button;

// Thermometer instance
twr_tmp112_t tmp112;
uint16_t button_click_count = 0;
//public variables for avarage temperature...
float prumer[30];
int counter = 0;
float sum = 0;
uint64_t id;

// Button event callback
void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)
{
    // Log button event
    //twr_log_info("APP: Button event: %i", event);

    // Check event source
    if (event == TWR_BUTTON_EVENT_CLICK)
    {
        // Toggle LED pin state
        //twr_led_set_mode(&led, TWR_LED_MODE_TOGGLE);
               
        // Publish message on radio
        if((button_click_count % 2) == 0){
            //twr_led_set_mode(&led, TWR_LED_MODE_BLINK_SLOW);
            twr_log_info("LED ON!");
            twr_led_set_mode(&led, TWR_LED_MODE_BLINK_FAST); 

        }
        else{
            twr_led_set_mode(&led, TWR_LED_MODE_OFF);
            twr_log_info("LED OFF!");
        }
        button_click_count++;
        twr_radio_pub_push_button(&button_click_count);
    }
}

void tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)
{
    if (event == TWR_TMP112_EVENT_UPDATE)
    {
        float celsius;
        // Read temperature
        twr_tmp112_get_temperature_celsius(self, &celsius);

        if(celsius >= 29){
            // twr_log_info("LED ON!");
            twr_led_set_mode(&led, TWR_LED_MODE_BLINK_FAST);
        }
        else {
            // twr_log_info("LED OFF!");
            twr_led_set_mode(&led, TWR_LED_MODE_OFF);
        }

        if(counter == 30){
            for (int i = 0; i < 30; i++){
                sum =+ prumer[i];
            }
            counter = 0;
            //twr_log_debug("APP: average temperature in last 5 minutes: %.2f °C", sum);
            //twr_log_info("%llu, ", twr_radio_get_my_id());
        }
        prumer[counter] = celsius;
        counter++;

        twr_log_info("%llu; %.2f", twr_radio_get_my_id(), celsius); //("APP: temperature: %.2f °C", celsius);

        /*twr_uart_init(TWR_UART_UART1, TWR_UART_BAUDRATE_115200, TWR_UART_SETTING_8N1);
        char uart_tx[] = "Hello world\r\n";
        twr_uart_write(TWR_UART_UART1, uart_tx, strlen(uart_tx));*/

        twr_radio_pub_temperature(TWR_RADIO_PUB_CHANNEL_R1_I2C0_ADDRESS_ALTERNATE, &celsius);
        //twr_radio_pub_temperature(TWR_RADIO_PUB_CHANNEL_R1_I2C0_ADDRESS_DEFAULT, &climate_temperature_value);
    }

}

// Application initialization function which is called once after boot
void application_init(void)
{
    // Initialize logging
    twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);

    // Initialize LED
    twr_led_init(&led, TWR_GPIO_LED, false, 0);
    twr_led_pulse(&led, 2000);

    // Initialize button
    twr_button_init(&button, TWR_GPIO_BUTTON, TWR_GPIO_PULL_DOWN, 0);
    twr_button_set_event_handler(&button, button_event_handler, NULL);

    // Initialize thermometer on core module
    twr_tmp112_init(&tmp112, TWR_I2C_I2C0, 0x49);
    twr_tmp112_set_event_handler(&tmp112, tmp112_event_handler, NULL);
    twr_tmp112_set_update_interval(&tmp112, 60000);
    

    // pridat inicializaci pres UART - seriova linka 
    // Initialize radio
    twr_radio_init(TWR_RADIO_MODE_NODE_SLEEPING);
    // Send radio pairing request
    twr_radio_pairing_request("skeleton", FW_VERSION);
}

// Application task function (optional) which is called peridically if scheduled
void application_task(void)
{
    //bc_scheduler_plan_current_from_now(50*1000); //sleep for 50 secs
    /*static int counter = 0;

    // Log task run and increment counter
    twr_log_debug("APP: Task run (count: %d)", ++counter);

    // Plan next run of this task in 1000 ms
    twr_scheduler_plan_current_from_now(1000);*/
}

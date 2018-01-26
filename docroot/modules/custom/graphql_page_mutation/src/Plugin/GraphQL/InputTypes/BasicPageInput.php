<?php

namespace Drupal\graphql_page_mutation\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * BasicPage input type.
 *
 * @GraphQLInputType(
 *   id = "basic_page_input",
 *   name = "BasicPageInput",
 *   fields = {
 *     "title" = "String",
 *     "body" = {
 *        "type" = "String",
 *        "nullable" = "TRUE"
 *     },
 *     "image_ids" = {
 *        "type" = "Int",
 *        "multi" = "TRUE",
 *        "nullable" = "TRUE"
 *     }
 *   }
 * )
 */
class BasicPageInput extends InputTypePluginBase {

}

<?php

namespace Drupal\graphql_page_mutation\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * BasicPage update type.
 *
 * @GraphQLInputType(
 *   id = "basic_page_update",
 *   name = "BasicPageUpdate",
 *   fields = {
 *     "title" = {
 *        "type" = "String",
 *        "nullable" = "TRUE"
 *     },
 *     "body" = {
 *        "type" = "String",
 *        "nullable" = "TRUE"
 *     },
 *     "field_media_image" = {
 *        "type" = "Int",
 *        "multi" = "TRUE",
 *        "nullable" = "TRUE"
 *     }
 *   }
 * )
 */
class BasicPageUpdate extends InputTypePluginBase {

}

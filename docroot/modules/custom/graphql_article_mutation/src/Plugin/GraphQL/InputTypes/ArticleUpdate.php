<?php

namespace Drupal\graphql_article_mutation\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * Article update type.
 *
 * @GraphQLInputType(
 *   id = "article_update",
 *   name = "ArticleUpdate",
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
class ArticleUpdate extends InputTypePluginBase {

}

<?php

namespace Drupal\graphql_article_mutation\Plugin\GraphQL\Mutations;

use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\UpdateEntityBase;
use Youshido\GraphQL\Execution\ResolveInfo;

/**
 * A Simple ArticleNode mutation.
 *
 * @GraphQLMutation(
 *   id = "update_article",
 *   entity_type = "node",
 *   entity_bundle = "article",
 *   secure = true,
 *   name = "updateArticle",
 *   type = "EntityCrudOutput!",
 *   arguments = {
 *     "id" = "Int",
 *     "input" = "ArticleUpdate"
 *   }
 * )
 */
class UpdateArticle extends UpdateEntityBase {

  /**
   * {@inheritdoc}
   */
  protected function extractEntityInput(array $args, ResolveInfo $info) {
    return [
      'title' => $args['input']['title'],
      'body' => $args['input']['body'],
      'field_media_image' => $args['input']['field_media_image'],
    ];
  }

}

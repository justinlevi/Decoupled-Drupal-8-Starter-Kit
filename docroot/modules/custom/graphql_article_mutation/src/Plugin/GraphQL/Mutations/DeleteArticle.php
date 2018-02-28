<?php

namespace Drupal\graphql_article_mutation\Plugin\GraphQL\Mutations;

use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\DeleteEntityBase;

/**
 * A Simple ArticleNode mutation.
 *
 * @GraphQLMutation(
 *   id = "delete_article",
 *   entity_type = "node",
 *   entity_bundle = "article",
 *   secure = true,
 *   name = "deleteArticle",
 *   type = "EntityCrudOutput!",
 *   arguments = {
 *     "id" = "Int"
 *   }
 * )
 */
class DeleteArticle extends DeleteEntityBase {

}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assets: {
        Row: {
          created_at: string | null
          created_by: string
          file_path: string
          file_size: number
          file_type: string | null
          id: string
          website_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          file_path: string
          file_size: number
          file_type?: string | null
          id?: string
          website_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          file_path?: string
          file_size?: number
          file_type?: string | null
          id?: string
          website_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      canvas_entities: {
        Row: {
          content: string | null
          created_at: string | null
          created_by: string
          entity_type: Database["public"]["Enums"]["canvas_entity_type"]
          height: number | null
          html_variant_id: string | null
          id: string
          updated_at: string | null
          width: number | null
          x: number
          y: number
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          created_by: string
          entity_type: Database["public"]["Enums"]["canvas_entity_type"]
          height?: number | null
          html_variant_id?: string | null
          id?: string
          updated_at?: string | null
          width?: number | null
          x: number
          y: number
        }
        Update: {
          content?: string | null
          created_at?: string | null
          created_by?: string
          entity_type?: Database["public"]["Enums"]["canvas_entity_type"]
          height?: number | null
          html_variant_id?: string | null
          id?: string
          updated_at?: string | null
          width?: number | null
          x?: number
          y?: number
        }
        Relationships: [
          {
            foreignKeyName: "canvas_entities_html_variant_id_fkey"
            columns: ["html_variant_id"]
            isOneToOne: false
            referencedRelation: "website_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      canvas_workspaces: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          updated_by: string
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          updated_by: string
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "canvas_workspaces_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      collaborators: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          invited_by: string
          role: string
          status: string | null
          updated_at: string | null
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          invited_by: string
          role?: string
          status?: string | null
          updated_at?: string | null
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          invited_by?: string
          role?: string
          status?: string | null
          updated_at?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collaborators_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      domains: {
        Row: {
          created_at: string | null
          created_by: string
          domain: string
          id: string
          is_custom: boolean | null
          updated_at: string | null
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          domain: string
          id?: string
          is_custom?: boolean | null
          updated_at?: string | null
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          domain?: string
          id?: string
          is_custom?: boolean | null
          updated_at?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "domains_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          created_at: string | null
          created_by: string
          email: string
          id: string
          status: string | null
          updated_at: string | null
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          email: string
          id?: string
          status?: string | null
          updated_at?: string | null
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          email?: string
          id?: string
          status?: string | null
          updated_at?: string | null
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          id: string
          max_llm_requests_per_day: number | null
          max_routes_per_website: number | null
          max_storage_mb: number | null
          max_websites: number | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_llm_requests_per_day?: number | null
          max_routes_per_website?: number | null
          max_storage_mb?: number | null
          max_websites?: number | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          max_llm_requests_per_day?: number | null
          max_routes_per_website?: number | null
          max_storage_mb?: number | null
          max_websites?: number | null
          name?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string | null
          created_by: string
          id: string
          path: string
          published_variant_id: string | null
          updated_at: string | null
          updated_by: string
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          id?: string
          path: string
          published_variant_id?: string | null
          updated_at?: string | null
          updated_by: string
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          id?: string
          path?: string
          published_variant_id?: string | null
          updated_at?: string | null
          updated_by?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_routes_published_variant_id"
            columns: ["published_variant_id"]
            isOneToOne: false
            referencedRelation: "website_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "routes_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_by: string
          expires_at: string | null
          id: string
          plan_id: string
          subscribed_at: string | null
        }
        Insert: {
          created_by: string
          expires_at?: string | null
          id?: string
          plan_id: string
          subscribed_at?: string | null
        }
        Update: {
          created_by?: string
          expires_at?: string | null
          id?: string
          plan_id?: string
          subscribed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_usage: {
        Row: {
          asset_storage_used_mb: number | null
          created_at: string | null
          created_by: string
          daily_llm_requests: number | null
          id: string
          total_llm_requests: number | null
          updated_at: string | null
        }
        Insert: {
          asset_storage_used_mb?: number | null
          created_at?: string | null
          created_by: string
          daily_llm_requests?: number | null
          id?: string
          total_llm_requests?: number | null
          updated_at?: string | null
        }
        Update: {
          asset_storage_used_mb?: number | null
          created_at?: string | null
          created_by?: string
          daily_llm_requests?: number | null
          id?: string
          total_llm_requests?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      website_variants: {
        Row: {
          created_at: string | null
          created_by: string
          html_path: string
          id: string
          is_selected: boolean | null
          route_id: string
          updated_at: string | null
          updated_by: string
          website_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          html_path: string
          id?: string
          is_selected?: boolean | null
          route_id: string
          updated_at?: string | null
          updated_by: string
          website_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          html_path?: string
          id?: string
          is_selected?: boolean | null
          route_id?: string
          updated_at?: string | null
          updated_by?: string
          website_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "website_variants_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "website_variants_website_id_fkey"
            columns: ["website_id"]
            isOneToOne: false
            referencedRelation: "websites"
            referencedColumns: ["id"]
          },
        ]
      }
      websites: {
        Row: {
          created_at: string | null
          created_by: string
          domain: string
          id: string
          is_first_visit: boolean | null
          is_published: boolean | null
          name: string
          updated_at: string | null
          updated_by: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          domain: string
          id?: string
          is_first_visit?: boolean | null
          is_published?: boolean | null
          name: string
          updated_at?: string | null
          updated_by: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          domain?: string
          id?: string
          is_first_visit?: boolean | null
          is_published?: boolean | null
          name?: string
          updated_at?: string | null
          updated_by?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_daily_usage: { Args: never; Returns: undefined }
    }
    Enums: {
      canvas_entity_type: "html" | "text" | "url" | "scribble" | "image"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      canvas_entity_type: ["html", "text", "url", "scribble", "image"],
    },
  },
} as const


export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          dt: string;
          id: number;
          pin_id: string;
          user_id: string;
        };
        Insert: {
          dt?: string;
          id?: number;
          pin_id: string;
          user_id: string;
        };
        Update: {
          dt?: string;
          id?: number;
          pin_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_pin_id_fkey";
            columns: ["pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          comment: string;
          created_at: string;
          id: number;
          pin_id: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: number;
          pin_id: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: number;
          pin_id?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_pin_id_fkey";
            columns: ["pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      content_shares: {
        Row: {
          id: number;
          list_id: string | null;
          pin_id: string | null;
          resulted_in_interaction: boolean | null;
          resulted_in_signup: boolean | null;
          shared_at: string;
          shared_by: string | null;
          shared_to_platform: string | null;
        };
        Insert: {
          id?: number;
          list_id?: string | null;
          pin_id?: string | null;
          resulted_in_interaction?: boolean | null;
          resulted_in_signup?: boolean | null;
          shared_at?: string;
          shared_by?: string | null;
          shared_to_platform?: string | null;
        };
        Update: {
          id?: number;
          list_id?: string | null;
          pin_id?: string | null;
          resulted_in_interaction?: boolean | null;
          resulted_in_signup?: boolean | null;
          shared_at?: string;
          shared_by?: string | null;
          shared_to_platform?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "content_shares_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["list_id"];
          },
          {
            foreignKeyName: "content_shares_pin_id_fkey";
            columns: ["pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          },
          {
            foreignKeyName: "content_shares_shared_by_fkey";
            columns: ["shared_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      feedback: {
        Row: {
          dt: string;
          id: number;
          message: string;
          user_id: string;
        };
        Insert: {
          dt?: string;
          id?: number;
          message: string;
          user_id: string;
        };
        Update: {
          dt?: string;
          id?: number;
          message?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "feedback_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      follows: {
        Row: {
          dt: string;
          id: number;
          list_id: string;
          user_id: string;
        };
        Insert: {
          dt?: string;
          id?: number;
          list_id: string;
          user_id: string;
        };
        Update: {
          dt?: string;
          id?: number;
          list_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["list_id"];
          },
          {
            foreignKeyName: "follows_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      list_pin: {
        Row: {
          dt: string;
          id: number;
          list_id: string;
          pin_id: string;
        };
        Insert: {
          dt?: string;
          id?: number;
          list_id: string;
          pin_id: string;
        };
        Update: {
          dt?: string;
          id?: number;
          list_id?: string;
          pin_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "list_pin_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["list_id"];
          },
          {
            foreignKeyName: "list_pin_pin_id_fkey";
            columns: ["pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          }
        ];
      };
      lists: {
        Row: {
          created_at: string;
          description: string | null;
          followers_count: number;
          is_private: boolean;
          list_id: string;
          list_photo_url: string | null;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          followers_count?: number;
          is_private?: boolean;
          list_id: string;
          list_photo_url?: string | null;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          followers_count?: number;
          is_private?: boolean;
          list_id?: string;
          list_photo_url?: string | null;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lists_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      notifications: {
        Row: {
          created_at: string;
          id: number;
          notification_text: string;
          notification_type: string;
          read: boolean;
          read_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          notification_text: string;
          notification_type: string;
          read?: boolean;
          read_at?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          notification_text?: string;
          notification_type?: string;
          read?: boolean;
          read_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      pins: {
        Row: {
          bookmark_count: number;
          copied_from_pin_id: string | null;
          created_at: string;
          deviation_count: number;
          is_private: boolean;
          list_id: string;
          notes: string | null;
          pin_id: string;
          pin_name: string;
          pin_photo_url: string | null;
          places_id: string | null;
          rating: number | null;
          review: string | null;
          review_updated_at: string | null;
          updated_at: string;
          user_id: string;
          visited: boolean;
          visited_at: string;
        };
        Insert: {
          bookmark_count?: number;
          copied_from_pin_id?: string | null;
          created_at?: string;
          deviation_count?: number;
          is_private?: boolean;
          list_id: string;
          notes?: string | null;
          pin_id: string;
          pin_name: string;
          pin_photo_url?: string | null;
          places_id?: string | null;
          rating?: number | null;
          review?: string | null;
          review_updated_at?: string | null;
          updated_at?: string;
          user_id: string;
          visited?: boolean;
          visited_at: string;
        };
        Update: {
          bookmark_count?: number;
          copied_from_pin_id?: string | null;
          created_at?: string;
          deviation_count?: number;
          is_private?: boolean;
          list_id?: string;
          notes?: string | null;
          pin_id?: string;
          pin_name?: string;
          pin_photo_url?: string | null;
          places_id?: string | null;
          rating?: number | null;
          review?: string | null;
          review_updated_at?: string | null;
          updated_at?: string;
          user_id?: string;
          visited?: boolean;
          visited_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pins_copied_from_pin_id_fkey";
            columns: ["copied_from_pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          },
          {
            foreignKeyName: "pins_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["list_id"];
          },
          {
            foreignKeyName: "pins_places_id_fkey";
            columns: ["places_id"];
            isOneToOne: false;
            referencedRelation: "places";
            referencedColumns: ["places_id"];
          },
          {
            foreignKeyName: "pins_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      places: {
        Row: {
          business_status: string | null;
          created_at: string;
          editorial_summary: string | null;
          formatted_address: string | null;
          lat: number;
          lng: number;
          maps_url: string | null;
          name: string;
          opening_hours: Json | null;
          phone_number: string | null;
          photo_attribution_href: string | null;
          photo_attribution_name: string | null;
          places_id: string;
          places_photo_url: string | null;
          price_level: number | null;
          types: string[] | null;
          updated_at: string;
          viewport_lat_delta: number;
          viewport_lng_delta: number;
          website: string | null;
        };
        Insert: {
          business_status?: string | null;
          created_at?: string;
          editorial_summary?: string | null;
          formatted_address?: string | null;
          lat: number;
          lng: number;
          maps_url?: string | null;
          name: string;
          opening_hours?: Json | null;
          phone_number?: string | null;
          photo_attribution_href?: string | null;
          photo_attribution_name?: string | null;
          places_id: string;
          places_photo_url?: string | null;
          price_level?: number | null;
          types?: string[] | null;
          updated_at?: string;
          viewport_lat_delta: number;
          viewport_lng_delta: number;
          website?: string | null;
        };
        Update: {
          business_status?: string | null;
          created_at?: string;
          editorial_summary?: string | null;
          formatted_address?: string | null;
          lat?: number;
          lng?: number;
          maps_url?: string | null;
          name?: string;
          opening_hours?: Json | null;
          phone_number?: string | null;
          photo_attribution_href?: string | null;
          photo_attribution_name?: string | null;
          places_id?: string;
          places_photo_url?: string | null;
          price_level?: number | null;
          types?: string[] | null;
          updated_at?: string;
          viewport_lat_delta?: number;
          viewport_lng_delta?: number;
          website?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          account_status: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_date: string | null;
          date_of_birth: string | null;
          email: string | null;
          first_name: string | null;
          followers_count: number;
          following_count: number;
          gender: string | null;
          id: string;
          last_login: string | null;
          last_name: string | null;
          pin_count: number;
          referral_key: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          account_status?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_date?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          followers_count?: number;
          following_count?: number;
          gender?: string | null;
          id: string;
          last_login?: string | null;
          last_name?: string | null;
          pin_count?: number;
          referral_key?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          account_status?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_date?: string | null;
          date_of_birth?: string | null;
          email?: string | null;
          first_name?: string | null;
          followers_count?: number;
          following_count?: number;
          gender?: string | null;
          id?: string;
          last_login?: string | null;
          last_name?: string | null;
          pin_count?: number;
          referral_key?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      search_history: {
        Row: {
          created_at: string;
          id: number;
          search_term: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          search_term: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          search_term?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "search_history_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      user_interactions: {
        Row: {
          duration: number | null;
          id: number;
          interacted_at: string;
          interaction_type: string;
          list_id: string;
          pin_id: string;
          user_id: string;
        };
        Insert: {
          duration?: number | null;
          id?: number;
          interacted_at?: string;
          interaction_type: string;
          list_id: string;
          pin_id: string;
          user_id: string;
        };
        Update: {
          duration?: number | null;
          id?: number;
          interacted_at?: string;
          interaction_type?: string;
          list_id?: string;
          pin_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_interactions_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "lists";
            referencedColumns: ["list_id"];
          },
          {
            foreignKeyName: "user_interactions_pin_id_fkey";
            columns: ["pin_id"];
            isOneToOne: false;
            referencedRelation: "pins";
            referencedColumns: ["pin_id"];
          },
          {
            foreignKeyName: "user_interactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      user_preferences: {
        Row: {
          created_at: string;
          dark_mode: boolean;
          id: number;
          language: string;
          location_sharing_enabled: boolean;
          notification_enabled: boolean;
          notification_frequency: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          dark_mode?: boolean;
          id?: number;
          language?: string;
          location_sharing_enabled?: boolean;
          notification_enabled?: boolean;
          notification_frequency?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          dark_mode?: boolean;
          id?: number;
          language?: string;
          location_sharing_enabled?: boolean;
          notification_enabled?: boolean;
          notification_frequency?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_list_img: {
        Args: {
          list_photo_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_pin_img: {
        Args: {
          pin_photo_url: string;
        };
        Returns: Record<string, unknown>;
      };
      delete_storage_object: {
        Args: {
          bucket: string;
          object: string;
        };
        Returns: Record<string, unknown>;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
